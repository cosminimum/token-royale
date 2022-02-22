export class OrderOfTheAwakened implements TeamInterface
{
    readonly TEAM_NAME: string = 'Order of the Awakened';
    readonly TEAM_SLUG: string = 'order_awakened';
    readonly BADGE_PATH: string = 'build/images/teams/order-of-the-awakened/team-icon.jpg';
    readonly COVER_PATH: string = 'build/images/teams/order-of-the-awakened/team-cover.jpg';

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