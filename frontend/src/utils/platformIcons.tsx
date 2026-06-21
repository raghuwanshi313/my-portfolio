import { SiLeetcode, SiCodeforces, SiCodechef, SiHackerrank, SiGeeksforgeeks } from 'react-icons/si';
import { FaCode } from 'react-icons/fa';
import type { ReactNode } from 'react';

interface PlatformConfig {
    icon: ReactNode;
    color: string;
}

const platformConfigs: Record<string, PlatformConfig> = {
    leetcode: {
        icon: <SiLeetcode className="text-white text-xl" />,
        color: '#FFA116',
    },
    codeforces: {
        icon: <SiCodeforces className="text-white text-xl" />,
        color: '#1F8ACB',
    },
    codechef: {
        icon: <SiCodechef className="text-white text-xl" />,
        color: '#5B4638',
    },
    hackerrank: {
        icon: <SiHackerrank className="text-white text-xl" />,
        color: '#00EA64',
    },
    geeksforgeeks: {
        icon: <SiGeeksforgeeks className="text-white text-xl" />,
        color: '#2F8D46',
    },
};

export const getPlatformConfig = (platform: string): PlatformConfig => {
    const normalizedPlatform = platform.toLowerCase().replace(/\s+/g, '');
    return platformConfigs[normalizedPlatform] || {
        icon: <FaCode className="text-white text-xl" />,
        color: 'var(--nav-text-hover)',
    };
};
