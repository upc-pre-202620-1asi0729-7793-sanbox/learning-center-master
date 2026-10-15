import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {EnrollmentsEntity} from '../domain/model/enrollments.entity';
import {EnrollmentsResponse, EnrollmentsResource} from './enrollments.response';
import {EnrollmentsAssembler} from './enrollments.assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


/**
 * Endpoint client for course CRUD operations.
 */
export class EnrollmentsApiEndpoint extends BaseApiEndpoint<EnrollmentsEntity, EnrollmentsResource, EnrollmentsResponse, EnrollmentsAssembler> {
  /**
   * Creates an instance of CoursesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderEnrollmentsEndpointPath}`,
      new EnrollmentsAssembler());
  }
}
