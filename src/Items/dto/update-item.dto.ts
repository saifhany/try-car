import { PartialType } from '@nestjs/mapped-types';
import { createItemDto } from './create-item.dto';

export class updateItemDto extends PartialType(createItemDto) {
    
}