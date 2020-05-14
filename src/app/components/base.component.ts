import { Component } from 'ensy';

export class BaseComponent<T> implements Component<T> {
    constructor(public name: string, public state: T) {
    }
}
