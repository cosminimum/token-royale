export class WarsongOutriders implements TeamInterface
{
    readonly TEAM_NAME: string = 'Warsong Outsiders';
    readonly TEAM_SLUG: string = 'warsong_putsiders';
    readonly BADGE_PATH: string = 'build/images/teams/warsong-outriders/team-icon.jpg';
    readonly COVER_PATH: string = 'build/images/teams/warsong-outriders/team-cover.jpg';

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