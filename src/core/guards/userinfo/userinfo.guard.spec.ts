import { UserinfoGuard } from './userinfo.guard.js';

describe('UserinfoGuard', () => {
  it('should be defined', () => {
    expect(new UserinfoGuard()).toBeDefined();
  });
});
