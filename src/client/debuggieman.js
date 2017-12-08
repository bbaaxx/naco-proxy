import { delayValue, printGenArray } from './app/redstone/sandie-box/asyncs';
import {
  funcMixinsStuff,
  composingStuff,
  functoringStuff,
} from './app/redstone/sandie-box/clogTests';

export default async function() {
  console.warn('$$ composingStuff');
  composingStuff(20);
  console.warn('$$ functoringStuff');
  functoringStuff();
  console.warn('$$ funcMixinsStuff');
  funcMixinsStuff();
  console.warn('$$ doing hookypooky');
  return delayValue(printGenArray('hookypooky'.split('')), 5000);
}
