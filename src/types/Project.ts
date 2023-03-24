export type Project = {
    name: string
    description: string
    appUrl: string
    images: {
        logo: string
        banner: string
        screenshots: Array<String>
    }
    repoUrl: string
    dappId: string
    minAge: number
    isForMatureAudience: boolean
    isSelfModerated: boolean
    language: string
    version: string
    isListed: boolean
    listDate: string
    availableOnPlatform: Array<String>
    geoRestrictions: {
        allowedCountries: Array<String>
        blockedCountries: Array<String>
    }
    developer: {
        legalName: string
        logo: string
        website: string
        privacyPolicyUrl: string
        support: {
            url: string
            email: string
        }
        githubID: string
    }
    tags: Array<String>
    chains: Array<number>
    category: string
    metrics: {
        dappId: string
        downloads: string
        installs: number
        uninstalls: number
        ratingsCount: number
        visits: number
        rating: number
    }
}