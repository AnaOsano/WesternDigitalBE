import { Injectable } from '@nestjs/common';


@Injectable()
export class SearchService {
  async search(query: string) {
    // This is a mocked response, replace with the actual implementation
    return {
      success: true,
      data: [
        {
          title: 'Mocked Result 1',
          description: 'Description for mocked result 1',
          link: 'https://example.com/result-1',
        },
        {
          title: 'Mocked Result 2',
          description: 'Description for mocked result 2',
          link: 'https://example.com/result-2',
        },
      ],
    };
  }
}
