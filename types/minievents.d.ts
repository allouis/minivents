/**
 * Add support of events to class.
 */
export class Events {
    /**
     * Listen to events.
     *
     * @param type
     * @param callback
     * @param context
     */
    on(type: string, callback: Function, context: any[])

    /**
     * Stop listening to events or specific callback.
     *
     * @param type
     * @param callback
     */
    off(type: string = null, callback: Function = null)

    /**
     * Send event. Callbacks will be triggered.
     *
     * @param type
     */
    emit(type: string)
}

/**
 * Can
 * @param object
 * @constructor
 */
export function Events<T>(object: T): T & Events;