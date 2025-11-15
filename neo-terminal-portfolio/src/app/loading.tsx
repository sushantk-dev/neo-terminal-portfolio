import Loader from '@/components/Loader';
import MinimalLoader from '@/components/MinimalLoader';
import { GlowLoader } from '@/components/MinimalLoader';
import { PulseDotsLoader } from '@/components/MinimalLoader';
import { TerminalMinimalLoader } from '@/components/MinimalLoader';

export default function Loading() {
    // return <Loader fullScreen showProgress />;
//   return <MinimalLoader variant="pulse"  message="Loading"/>;
    // return <GlowLoader />
    return <TerminalMinimalLoader />
    // return <PulseDotsLoader />
}