import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs({ items, children }) {
  return (
    <div className="w-full pt-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-50 dark:bg-neutral-900 rounded font-medium">
          {items.map((item, index) => {
            return (
              <Tab key={index + 1}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2 text-[15px] font-semibold text-blue-500 rounded',
                    selected
                      ? '!bg-blue-500 font-bold	!text-white'
                      : 'text-blue-500 hover:bg-blue-100 dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-600 transition-all duration-200'
                  )
                }
              >
                {item}
              </Tab>
            )
          })}
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