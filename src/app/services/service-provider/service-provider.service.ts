import {Injectable, Injector} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class ServiceProviderService {
  protected abstract serviceName: string;

  protected config: ConfigurationService;

  constructor(
    protected injector: Injector
  ) {
    this.config = injector.get(ConfigurationService);
  }

  protected getBaseUrl(addModelName = false): string {
    const baseUrl: string = this.config.getApplicationEndpoint(this.serviceName);
    if (addModelName) {
      return `${baseUrl}${this.getServicesEntity(this.serviceName)}/`;
    }

    return baseUrl;
  }

  protected getBaseUrlForService(serviceName: string): string {
    return this.config.getApplicationEndpoint(serviceName);
  }

  protected getServicesEntity(msServiceName: string) {
    return this.config.getServiceEntity(msServiceName);
  }
}
