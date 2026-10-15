import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {StudentsEntity} from '../domain/model/students.entity';
import {StudentsResponse, StudentsResource} from './students.response';
import {StudentsAssembler} from './students.assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


/**
 * Endpoint client for course CRUD operations.
 */
export class StudentsApiEndpoint extends BaseApiEndpoint<StudentsEntity, StudentsResource, StudentsResponse, StudentsAssembler> {
  /**
   * Creates an instance of CoursesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderStudentsEndpointPath}`,
      new StudentsAssembler());
  }
}
