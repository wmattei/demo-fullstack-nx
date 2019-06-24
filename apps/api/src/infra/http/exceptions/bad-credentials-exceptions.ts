import { HttpException } from '@nestjs/common';

export class BadCredentialsException extends HttpException {
    constructor(message?) {
        super(message || 'Bad credentials', 400);
    }
}
