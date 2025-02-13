import { Comment } from "./comment";

export  interface Ticket{
  ticketId : string,
  categoryId : string, 
  subCategoryId : string,
  assigneeId : string,
  reportedId : string ,
  subject : string,
  description :string,
  statusId : string,
  priorityId : string,
  createDateTime :string,
  lastModifiedDateTime : string,
  userName? : string,
  comment : Comment[],
  dataBaseId ?:string,
}
