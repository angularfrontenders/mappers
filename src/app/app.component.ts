import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
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
    readEntities: Array<IReadEntity>;
    entity: IEntity;
    entities: Array<IEntity>;
    entitiesOf$: Observable<Array<IEntity>>;
    entitiesFrom: Array<IEntity> = [];

    public constructor(private _entityMapperService: EntityMapperService) {
    }

    ngOnInit(): void {
        // Map entity
        this.readEntities = [
            {
                id: '1',
                name: 'example mapper',
                birthDate: '2000/01/01',
                type: 'person',
                version: 1
            }
            , {
                id: '2',
                name: 'example mapper 2',
                birthDate: '2000/01/01',
                type: 'person2',
                version: 2
            }
        ];

        this.entity = this._entityMapperService.transform(this.readEntities[0]);

        // Map array of entities
        this.entities = this._entityMapperService.transform(this.readEntities);

        // Use in observables
        // of
        const readEntitiesOf$: Observable<Array<IReadEntity>> = of(this.readEntities);
        this.entitiesOf$ = readEntitiesOf$
        .pipe(
            map(
            (readEntity: Array<IReadEntity>) =>
                this._entityMapperService.transform(readEntity)
            ));

        // from
        const arrayReadEntitiesFrom$: Observable<IReadEntity> = from(this.readEntities);
        arrayReadEntitiesFrom$.pipe(map((readEntity: IReadEntity) =>
            this._entityMapperService.transform(readEntity)
        ))
        .subscribe((value: IEntity) =>
            this.entitiesFrom.push(value)
        );
    }

    public entityId(index: number, entity: IEntity): string {
        return entity.id;
    }

}
