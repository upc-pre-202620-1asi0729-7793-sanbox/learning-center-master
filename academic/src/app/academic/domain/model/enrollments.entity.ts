import {BaseEntity} from '../../../../shared/domain/model/base-entity';
import {StudentsEntity} from './students.entity';

/**
 * Represents a course category in the learning domain model.
 */
export class EnrollmentsEntity implements BaseEntity {
  /**
   * The unique identifier for the category.
   */
  #id: number;

  /**
   * The name of the category.
   */
  #studentId: number;

  #courseName: string;

  #student: StudentsEntity | null;

  /**
   * Creates a new category entity.
   * @param props - Initialization values.
   */
  constructor(props: { id: number; studentId: number, courseName: string, student: StudentsEntity | null }) {
    this.#id = props.id;
    this.#studentId = props.studentId;
    this.#courseName = props.courseName;
    this.#student = props.student ?? null;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get studentId(): number {
    return this.#studentId;
  }

  set studentId(value: number) {
    this.#studentId = value;
  }

  get courseName(): string {
    return this.#courseName;
  }

  set courseName(value: string) {
    this.#courseName = value;
  }

  get student(): StudentsEntity | null {
    return this.#student;
  }

  set student(value: StudentsEntity | null) {
    this.#student = value;
  }

}
