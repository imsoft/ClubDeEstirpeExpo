import { Project } from ".";

export interface EntrepreneurUser {
  image: string;
  curriculumProfesional: string;
  creditBureauOpinion: string;
  personalReference: string;
  email: string;
  password: string;
  project: Project;
}
