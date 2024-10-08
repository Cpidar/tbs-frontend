"use client"

import { FC, Fragment, ReactNode, useState } from "react"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import {
  ExclamationTriangleIcon,
  HashtagIcon,
  LifebuoyIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import MyImage from "../MyImage"
import { useRouter } from "next/navigation"

const categories: any[] = []
const posts: any[] = [{
    title: "fdasfadsa",
    href: "fdsafdk"
}]
const authors: any[] = []

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  renderTrigger?: () => ReactNode
}

const SearchModal: FC<Props> = ({ renderTrigger }) => {
  const [open, setOpen] = useState(false)
  const [rawQuery, setRawQuery] = useState("a")

  const router = useRouter()

  const query = rawQuery.toLowerCase().replace(/^[#>]/, "")

  const filteredPosts =
    rawQuery === "#"
      ? posts
      : query === "" || rawQuery.startsWith(">")
      ? []
      : posts.filter((project) => project.title.toLowerCase().includes(query))

  const filteredProjects =
    rawQuery === "#"
      ? categories
      : query === "" || rawQuery.startsWith(">")
      ? []
      : categories.filter((project) =>
          project.name.toLowerCase().includes(query)
        )

  const filteredUsers =
    rawQuery === ">"
      ? authors
      : query === "" || rawQuery.startsWith("#")
      ? []
      : authors.filter((user) => user.displayName.toLowerCase().includes(query))

  return (
    <form className="flex-1 py-2 text-slate-900 dark:text-slate-100 block mx-auto max-w-2xl divide-y divide-gray-100 overflow-hidden bg-white transition-all">
      <Combobox
        onChange={(item: any) => {
          router.push(item.href)
          setOpen(false)
        }}
        name="searchpallet"
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            placeholder="Search..."
            onChange={(event) => setRawQuery(event.target.value)}
          />
        </div>

        {(filteredProjects.length > 0 ||
          filteredUsers.length > 0 ||
          filteredPosts.length > 0) && (
            <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={() => setQuery('')}
          >
          <Combobox.Options
            static
            className="absolute top-[100px] max-h-80 scroll-py-10 bg-white w-full scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2 shadow-lg ring-1 ring-black/5"
          >
            {filteredPosts.length > 0 && (
              <li>
                <h2 className="text-xs font-semibold text-gray-900">Posts</h2>
                <ul className="-mx-4 mt-2 text-sm text-gray-700">
                  {filteredPosts.map((post) => (
                    <Combobox.Option
                      key={post.id}
                      value={post}
                      className={({ active }) =>
                        classNames(
                          "flex select-none items-center px-4 py-2",
                          active && "bg-indigo-600 text-white"
                        )
                      }
                    >
                      {({ active }) => (
                        <>
                          <ClockIcon
                            className={classNames(
                              "h-6 w-6 flex-none",
                              active ? "text-white" : "text-gray-400"
                            )}
                            aria-hidden="true"
                          />
                          <span className="ms-3 flex-auto truncate">
                            {post.title}
                          </span>
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </ul>
              </li>
            )}

            {filteredProjects.length > 0 && (
              <li>
                <h2 className="text-xs font-semibold text-gray-900">
                  Categories
                </h2>
                <ul className="-mx-4 mt-2 text-sm text-gray-700">
                  {filteredProjects.map((project) => (
                    <Combobox.Option
                      key={project.id}
                      value={project}
                      className={({ active }) =>
                        classNames(
                          "flex select-none items-center px-4 py-2",
                          active && "bg-indigo-600 text-white"
                        )
                      }
                    >
                      {({ active }) => (
                        <>
                          <HashtagIcon
                            className={classNames(
                              "h-6 w-6 flex-none",
                              active ? "text-white" : "text-gray-400"
                            )}
                            aria-hidden="true"
                          />
                          <span className="ms-3 flex-auto truncate">
                            {project.name}
                          </span>
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </ul>
              </li>
            )}

            {filteredUsers.length > 0 && (
              <li>
                <h2 className="text-xs font-semibold text-gray-900">Authors</h2>
                <ul className="-mx-4 mt-2 text-sm text-gray-700">
                  {filteredUsers.map((user) => (
                    <Combobox.Option
                      key={user.id}
                      value={user}
                      className={({ active }) =>
                        classNames(
                          "flex select-none items-center px-4 py-2",
                          active && "bg-indigo-600 text-white"
                        )
                      }
                    >
                      <MyImage
                        src={user.avatar}
                        alt="author"
                        className="h-6 w-6 flex-none rounded-full"
                        sizes="30px"
                      />
                      <span className="ms-3 flex-auto truncate">
                        {user.displayName}
                      </span>
                    </Combobox.Option>
                  ))}
                </ul>
              </li>
            )}
          </Combobox.Options>
          </Transition>
        )}

        {rawQuery === "?" && (
          <div className="py-14 px-6 text-center text-sm sm:px-14">
            <LifebuoyIcon
              className="mx-auto h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <p className="mt-4 font-semibold text-gray-900">
              Help with searching
            </p>
            <p className="mt-2 text-gray-500">
              Use this tool to quickly search for users and projects across our
              entire platform. You can also use the search modifiers found in
              the footer below to limit the results to just users or projects.
            </p>
          </div>
        )}

        {query !== "" &&
          rawQuery !== "?" &&
          filteredProjects.length === 0 &&
          filteredUsers.length === 0 && (
            <div className="py-14 px-6 text-center text-sm sm:px-14">
              <ExclamationTriangleIcon
                className="mx-auto h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
              <p className="mt-4 font-semibold text-gray-900">
                No results found
              </p>
              <p className="mt-2 text-gray-500">
                We couldn’t find anything with that term. Please try again.
              </p>
            </div>
          )}

        <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
          Type enter to go to search page
        </div>
      </Combobox>
    </form>
  )
}

export default SearchModal
