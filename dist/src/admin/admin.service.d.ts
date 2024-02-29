import { Fuel, Station } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { StationAddFuelDto } from './dto/station-add-fuel.dto';
import { StationCreateDto } from './dto/station-create.dto';
import { StationSetStatusDto } from './dto/station-set-status.dto';
export declare class AdminService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createStation(stationCreateDto: StationCreateDto): Promise<Station>;
    setStationStatus(stationId: number, stationSetStatusDto: StationSetStatusDto): Promise<Station>;
    removeStation(stationId: number): Promise<any>;
    getStations(): Promise<Station[]>;
    getStation(stationId: number): Promise<Station>;
    addFuelToStation(stationId: number, stationAddFuelDto: StationAddFuelDto): Promise<Fuel>;
}
