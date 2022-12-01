import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs({ items, children }) {
  return (
    <div className="sm:px-0">
      <Tab.Group>
        <Tab.List className="flex font-medium whitespace-nowrap border-b border-neutral-300 dark:border-neutral-700">
          <div className="flex gap-x-5">
            {items.map((item, index) => {
              return (
                <Tab key={index + 1}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-1 font-medium -mb-[0.06rem] transition-all duration-200',
                      'text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100',
                      'border-b-2 border-transparent',
                      selected ? '!text-sky-500 border-b-2 !border-sky-500' : ''
                    )
                  }
                >
                  {item}
                </Tab>
              )
            })}
          </div>
        </Tab.List>
        <Tab.Panels>
          {children}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

Tabs.Tab = ({ children, className }) => {
  return (
    <Tab.Panel className={className}>
      {children}
    </Tab.Panel>
  )
}

Tabs.Tab.displayName = "Tabs.Tab"