import {Injectable} from '@nestjs/common';
import {
    ClientProxy,
    Client,
    Transport,
} from '@nestjs/microservices';
import {Observable} from 'rxjs';

import {UserDto} from '../dto/user.dto';
import {CreateUserDto} from '../dto/create-user.dto';
import {USER_MICROSERVICE} from '../configs/microservice.address';

const {port, url} = USER_MICROSERVICE.hosts;

@Injectable()
export class UsersService {
    @Client({transport: Transport.TCP, options: {port, host: url}})
    private client: ClientProxy;

    public create(dto: CreateUserDto): Observable<any> {
        return this.client.send({cmd: 'create'}, dto);
    }

    public findAll(): Observable<UserDto[]> {
        return this.client.send({cmd: 'findAll'}, '');
    }
}
