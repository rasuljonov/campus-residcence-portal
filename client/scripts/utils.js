
    export function describeBeds(bedCount) {
        switch (bedCount) {
            case 1:
                return 'Single';
            case 2:
                return 'Double';
            case 3:
                return 'Triple';
            case 4:
                return 'Quadruple';
            default:
                return `${bedCount} Beds`;
        }
    }
