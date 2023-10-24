/**
 * 这个文件用于声明eventBus事件总线的key值和对应类型
 */
import type { EventBusKey } from '@vueuse/core'

export const fooKey: EventBusKey<{ name: string }> = Symbol('symbol-key')
