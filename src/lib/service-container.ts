export class ServiceContainer {
    private services: Service<any>[] = [];

    addService(service: Service<any>): void {
        this.services.push(service);
    }

    getService<TService>(type: { new (): TService }): TService {
        const service: TService = this.services.find((service) => service.type === type)?.instance;

        return service;
    }
}

export class Service<TService> {
    constructor(public type: { new (): TService }, public instance: TService) {}
}
