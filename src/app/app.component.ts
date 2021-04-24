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
    readEntity: IReadEntity;
    entity: IEntity;
    entities: Array<IEntity>;

    public constructor(private _entityMapperService: EntityMapperService) {

    }

    ngOnInit(): void {
        // Map entity
        this.readEntity = {
            id: '123',
            name: 'example mapper',
            birthDate: '2000/01/01',
            type: 'person',
            version: 2
        };
        this.entity = this._entityMapperService.transform(this.readEntity);

        // Map array of entities
        const arrayEntities: Array<IReadEntity> = [this.readEntity];
        this.entities = this._entityMapperService.transform(arrayEntities);
    }

}
