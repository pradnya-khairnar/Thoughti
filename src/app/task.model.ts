export class Task {
  public Task: string;
  public Expiry_date: string;
  public User: string;
  public Important: boolean;
  public Created_on: string;
  constructor(
    task: string,
    date: string,
    user: string,
    flag: boolean,
    created: string
  ) {
    this.Task = task;
    this.Expiry_date = date;
    this.User = user;
    this.Important = flag;
    this.Created_on = created;
  }
}
