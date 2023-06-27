interface IUrl {
  readonly id?: number;

  readonly longUrl: string;
  readonly shortUrl: string;
  readonly urlCode: string;
  readonly clicks: number;
  readonly creatorId: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

interface ICode {
  readonly code: string;
}

interface IShortUrl {
  readonly shortUrl: string;
}

interface IClicks {
  readonly clicks: number;
}

export { IUrl, ICode, IShortUrl, IClicks };
