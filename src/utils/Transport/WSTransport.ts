import { EventBus } from '../../core/EventBus.ts'
import { WSEvents, WS_URL } from './constants.ts'

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null
  private pingInterval: NodeJS.Timeout | undefined | number = 0

  constructor(private url: string) {
    super()
  }

  public send(data: unknown) {
    if (!this.socket?.readyState) {
      throw new Error('Socket is not connected')
    }

    this.socket.send(JSON.stringify(data))
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(`${WS_URL}${this.url}`)

    this.subscribe(this.socket)

    this.setupPing()

    return new Promise((resolve) => {
      this.on(WSEvents.OPEN, () => {
        resolve()
      })
    })
  }

  public close() {
		console.log('SOCKET CLOSED');
    this.socket?.close()
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' })
    }, 20000)

    this.on(WSEvents.CLOSE, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    })
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', (event) => {
      this.emit(WSEvents.OPEN, event)
    })
    socket.addEventListener('close', (event) => {
      this.emit(WSEvents.CLOSE, event)
    })

    socket.addEventListener('error', (event) => {
      this.emit(WSEvents.ERROR, event)
    })

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data)

        if (data.type && data.type === 'pong') {
          return
        }
				// console.log(data);
        this.emit(WSEvents.MESSAGE, data)
      } catch (e) {
        throw Error(e);
      }
    })
  }

	get readyState(){
		return this.socket?.readyState;
	}
}
