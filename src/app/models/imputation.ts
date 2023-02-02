import { Project } from "./project";
import { User } from "./user";

export interface Imputation{
    idImputation: number;
    dateImputation: Date;
    dailyChargeImputation: number;
    idProject: number;
    //project: Project;
    //user: User;
}