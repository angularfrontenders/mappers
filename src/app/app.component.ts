import { Component, OnInit } from '@angular/core';
import { EntityMapperService } from './mapper/entityMapper.service';
import { IReadEntity } from './mapper/iReadEntity';
import { IEntity } from './mapper/iEntity';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'mappers';

    public constructor(private _entityMapperService: EntityMapperService) {

    }

    ngOnInit(): void {
        // Map entity
        const readEntity: IReadEntity = {
            id: '123',
            name: 'example mapper',
            birthDate: '2000/01/01',
            type: 'person',
            version: 2
        };
        const entity: IEntity = this._entityMapperService.transform(readEntity);

        // Map array of entities
        const arrayEntities: Array<IReadEntity> = [readEntity];
        const entities: Array<IEntity> = this._entityMapperService.transform(arrayEntities);
    }

}
