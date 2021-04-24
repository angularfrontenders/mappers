import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    arrayEntities$: Observable<Array<IEntity>>;

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
        const arrayReadEntities: Array<IReadEntity> = [this.readEntity];
        this.entities = this._entityMapperService.transform(arrayReadEntities);

        // Use in observables
        const arrayReadEntities$: Observable<Array<IReadEntity>> = of(arrayReadEntities);
        this.arrayEntities$ = arrayReadEntities$.pipe(map((readEntity: Array<IReadEntity>) => this._entityMapperService.transform(readEntity)));

    }

}
