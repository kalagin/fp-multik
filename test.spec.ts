import multik, { noop, first, last } from './index';

enum UserRole {
  Admin = 'admin',
  Guest = 'guest',
  Editor = 'editor',
}
type User = { fullname: string; age: number; role: UserRole };
const adminUser: User = { fullname: 'John Smith', age: 20, role: UserRole.Admin };
const guestUser: User = { fullname: 'Evan Martinez', age: 24, role: UserRole.Guest };
const editorUser: User = { fullname: 'Tod Parker', age: 17, role: UserRole.Editor };

describe('multik', () => {
  it('should run method by simple predicate', () => {
    const getInformation = multik(
      (data: User) => data.role,
      [UserRole.Admin, () => 'secret information'],
      [UserRole.Guest, () => 'no access'],
    );

    expect(getInformation(adminUser)).toBe(`secret information`);
    expect(getInformation(guestUser)).toBe(`no access`);
  });

  it('should run method by simple predicate with access to data and selector', () => {
    const getInformation = multik(
      (data: User) => data.role,
      [UserRole.Admin, (data) => `secret information for ${data?.fullname}`],
      [UserRole.Guest, (data, role) => `no access for ${role}`],
    );

    expect(getInformation(adminUser)).toBe(`secret information for John Smith`);
    expect(getInformation(guestUser)).toBe(`no access for guest`);
  });

  it('should run default method if predicate not matched', () => {
    const getInformation = multik(
      (data: User) => data.role,
      [UserRole.Admin, () => 'secret information'],
      [UserRole.Guest, () => 'no access'],
      [() => 'unknown role for access'],
    );

    expect(getInformation(editorUser)).toBe(`unknown role for access`);
  });

  it('should run default method with access to data and selector', () => {
    const getInformation = multik(
      (data: User) => data.role,
      [UserRole.Admin, () => 'secret information'],
      [UserRole.Guest, () => 'no access'],
      [(data, role) => `unknown role: ${role}`],
    );

    expect(getInformation(editorUser)).toBe(`unknown role: editor`);
  });

  it('should run no-op if default method not specified', () => {
    const getInformation = multik(
      (data: User) => data.role,
      [UserRole.Admin, () => 'secret information'],
      [UserRole.Guest, () => 'no access'],
    );

    expect(getInformation(editorUser)).toBeUndefined();
  });

  it('should run method by OR predicate', () => {
    const getInformation = multik(
      (data: User) => data.role,
      [[UserRole.Admin, UserRole.Editor], () => 'secret information'],
      [UserRole.Guest, () => 'no access'],
      [() => 'unknown role for access'],
    );

    expect(getInformation(adminUser)).toBe('secret information');
    expect(getInformation(editorUser)).toBe('secret information');
    expect(getInformation(guestUser)).toBe('no access');
  });

  it('should run method by custom predicate', () => {
    const getAdultContent = multik(
      (data: User) => data.age,
      [(data, age) => age! < 18, () => 'no access to adult content'],
      [() => 'access to adult content success'],
    );

    expect(getAdultContent(editorUser)).toBe('no access to adult content');
    expect(getAdultContent(guestUser)).toBe('access to adult content success');
  });
});

describe('utils', () => {
  describe('noop', () => {
    expect(noop()).toBeUndefined();
  });

  describe('first', () => {
    expect(first([])).toBeUndefined();
    expect(first([1, 2])).toBe(1);
  });

  describe('last', () => {
    expect(last([])).toBeUndefined();
    expect(last([1, 2])).toBe(2);
  });
});
