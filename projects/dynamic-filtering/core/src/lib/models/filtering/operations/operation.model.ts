import { ComparisonOperation } from "./comparison-operation.model";
import { EqualOperation } from "./equal-operation.model";
import { InOperation } from "./in-operation.model";
import { LikeOperation } from "./like-operation.model";

export type Operation =
    | ComparisonOperation
    | EqualOperation
    | LikeOperation
    | InOperation;
