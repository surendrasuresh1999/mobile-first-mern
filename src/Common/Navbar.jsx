import { Popover } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const userInformation = JSON.parse(
    localStorage.getItem("mernTraineeUserInfo")
  );
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="shadow">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div className="flex md:absolute md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-8">
                  <div className="flex items-center px-4 py-6 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                    <div className="w-full">
                      <div className="relative text-center">
                        <h1 className="text-indigo-800 text-xs sm:text-3xl font-bold">
                          Mobile First - MERN Trainee 😎
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end xl:col-span-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                    <span className="font-medium leading-none text-white">
                      {userInformation.name.slice(0, 2).toUpperCase()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </Popover>
    </>
  );
}
