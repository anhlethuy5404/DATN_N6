import { formatMessage, formatObject } from '@utils/formatter';

interface UserData {
  id: number;
  name: string;
  email: string;
}

const userData: UserData = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

console.log(formatMessage('Processing user data'));
console.log(formatObject(userData));
