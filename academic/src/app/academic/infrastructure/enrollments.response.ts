import {BaseResource, BaseResponse} from '../../../shared/infrastructure/base-response';

/**
 * Resource representation of a course.
 */
export interface EnrollmentsResource extends BaseResource {
  /**
   * Unique identifier for the course.
   */
  id: number;
  /**
   * Title of the course.
   */
  studentId: number;
  /**
   * coursename of the course.
   */
  courseName: string;
}

export interface EnrollmentsResponse extends BaseResponse {
  /**
   * An Array for course resources included in the response.
   */
  Enrollments: EnrollmentsResource[];
}
