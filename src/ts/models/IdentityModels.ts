/**
* IdentityModels.tsx
* Copyright: Microsoft 2018
*
* Type definitions for user identities.
*/

export type UserId = string;

export interface User {
    id: string;
    fullName: string;
    address?: string;    
    transactionEth?: number;
    transactionBSC?: number;
    transactionMatic?: number;
}
