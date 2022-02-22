export class SilverwingSentinels implements TeamInterface
{
    readonly TEAM_NAME: string = 'Silverwing Sentinels';
    readonly TEAM_SLUG: string = 'silverwing_sentinels';
    readonly BADGE_PATH: string = 'build/images/teams/silverwing-sentinels/team-icon.jpg';
    readonly COVER_PATH: string = 'build/images/teams/silverwing-sentinels/team-cover.jpg';

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