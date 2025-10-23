import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  biography?: string;
  nationality?: string;
  photo?: string;
};

export type CreateAuthorModel = Omit<AuthorModel, 'id'>;
