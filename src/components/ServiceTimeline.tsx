import { useState } from 'react';
import { Timeline, Button } from '@telegram-apps/telegram-ui';
import { steps } from '@/lib/utils/service';


export default function ServiceTimeline() {

  const [active, setActive] = useState(0);
  const prev = () => setActive(i => (i > 0 ? i - 1 : i));
  const next = () => setActive(i => (i < steps.length - 1 ? i + 1 : i));

  return (
    <section className="w-full p-3 space-y-4">
      <h2 className="text-lg font-semibold text-center">
        Шаг {active + 1} / {steps.length}
      </h2>

      <div className="overflow-x-auto pb-2">
        <Timeline active={active} horizontal>
          {steps.map((_, i) => (
            <Timeline.Item
              key={i}
              header=""
              onClick={() => setActive(i)}
            />
          ))}
        </Timeline>
      </div>

      <div className="bg-[var(--tg-theme-secondary-bg-color)] rounded-2xl p-4 shadow overflow-y-auto">
        <h3 className="font-medium mb-2 text-center">{steps[active].header}</h3>
        {steps[active].body}
      </div>

      <div className="flex justify-between gap-2">
        <Button size="m" disabled={active === 0} onClick={prev} className="flex-1">
          ← Назад
        </Button>
        <Button size="m" disabled={active === steps.length - 1} onClick={next} className="flex-1">
          Далее →
        </Button>
      </div>
    </section>
  );
}
