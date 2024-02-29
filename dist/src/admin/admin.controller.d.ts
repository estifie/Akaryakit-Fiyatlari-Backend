import { Fuel, Station } from '@prisma/client';
import { AdminService } from './admin.service';
import { StationAddFuelDto } from './dto/station-add-fuel.dto';
import { StationCreateDto } from './dto/station-create.dto';
import { StationSetStatusDto } from './dto/station-set-status.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createStation(stationCreateDto: StationCreateDto): Promise<Station>;
    addFuelToStation(stationId: number, stationAddFuelDto: StationAddFuelDto): Promise<Fuel>;
    removeStation(stationId: number): Promise<any>;
    getStations(): Promise<Station[]>;
    getStation(stationId: number): Promise<Station>;
    setStationStatus(stationId: number, stationSetStatusDto: StationSetStatusDto): Promise<Station>;
}
