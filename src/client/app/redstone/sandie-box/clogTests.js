import { compose, pipe, trace as t } from './composition';
import Identity from './functors';

const f = n => n + 1;
const g = n => n * 2;

export function composingStuff(numpar) {
  pipe(f, t('pg->'), g, t('pf->'))(numpar);
  compose(t('cf->'), g, t('cg->'), f)(numpar);
  t('nf->')(g(t('ng->')(f(numpar))));
}

export function functoringStuff() {
  const u = Identity(2);

  // Identity law
  u.map(t('identity law'));
  u.map(x => x).map(t('identity law'));

  // Composition law
  const r1 = u.map(x => f(g(x)));
  const r2 = u.map(g).map(f);
  r1.map(t('composition law'));
  r2.map(t('composition law'));

  // valueOf
  const ints = Identity(2) + Identity(4);
  t('valueOf')(ints); // 6
  const hi = Identity('h') + Identity('i');
  t('valueOf')(hi); // "hi"

  // toString
  const tts = Identity('perrito');
  t('toString')(tts.toString());

  // [Symbol.iterator] enables standard JS iterations:
  console.warn('iterator');
  const arr = [6, 7, ...Identity(8)];
  t('iterator')(arr); // [6, 7, 8]

  // frange
  const fRange = (start, end) =>
    Array.from({ length: end - start + 1 }, (x, i) => Identity(i + start));
  t('fRange1')(fRange(2, 4));
}

export function funcMixinsStuff() {
  const flying = o => {
    let isFlying = false;
    return Object.assign({}, o, {
      fly() {
        isFlying = true;
        return this;
      },
      isFlying: () => isFlying,
      land() {
        isFlying = false;
        return this;
      },
    });
  };
  const quacking = quack => o => Object.assign({}, o, { quack: () => quack });
  const createUglyDuck = quack => quacking(quack)(flying({}));
  const createPrettyDuck = quack => pipe(flying, quacking(quack))({});
  // A bird
  const bird = flying({});
  console.log(bird.isFlying()); // false
  console.log(bird.fly().isFlying()); // true

  // Lets add sound
  const quacker = quacking('Quack!')({});
  console.log(quacker.quack());

  // The ducks
  const uglyDuck = createUglyDuck('Ugly Quack!!');
  console.log(uglyDuck.fly().quack());
  const prettyDuck = createPrettyDuck('Pretty Quack!!');
  console.log(prettyDuck.fly().quack());
}
