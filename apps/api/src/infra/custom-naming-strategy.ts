import { snakeCase } from '@demo-fullstack-nx/api-interface';
import { DefaultNamingStrategy } from 'typeorm';

export class CustomNamingStrategy extends DefaultNamingStrategy {
    columnName(propertyName, customName, embeddedPrefixes) {
        if (embeddedPrefixes.length)
            return (
                snakeCase(embeddedPrefixes.join('_')) +
                (customName ? snakeCase(customName) : snakeCase(propertyName))
            );

        return customName ? customName : snakeCase(propertyName);
    }

    joinTableColumnName(tableName, propertyName) {
        return snakeCase(tableName + '_' + propertyName);
    }

    joinTableInverseColumnName(tableName, propertyName) {
        return snakeCase(tableName + '_' + propertyName);
    }

    joinColumnName(relationName, referencedColumnName) {
        return snakeCase(relationName + '_' + referencedColumnName);
    }
}
