export class BroodOfNozdormu implements TeamInterface
{
    readonly TEAM_NAME: string = 'Brood of Nozdormu';
    readonly TEAM_SLUG: string = 'brood_nozdormu';
    readonly BADGE_PATH: string = 'build/images/teams/brood-of-nozdormu/team-icon.jpg';
    readonly COVER_PATH: string = 'build/images/teams/brood-of-nozdormu/team-cover.jpg';

    getBadgePath(): string {
        return this.BADGE_PATH;
    }

    getCoverPath(): string {
        return this.COVER_PATH;
    }

    getName(): string {
        return this.TEAM_NAME;
    }

    getSlogan(): string {
        return "";
    }

    getSlug(): string {
        return this.TEAM_SLUG;
    }

}