import Image from "next/image";

export interface SpecificationProductItem {
  label: string;
  value: string;
}

interface SpecificationProductCardProps {
  title: string;
  descript: string;
  image: string;
  specification: SpecificationProductItem[];
  imageAlt?: string;
}

export default function SpecificationProductCard({
  title,
  descript,
  image,
  specification,
  imageAlt = title,
}: SpecificationProductCardProps) {
  const midpoint = Math.ceil(specification.length / 2);
  const specificationGroups = [
    specification.slice(0, midpoint),
    specification.slice(midpoint),
  ].filter((group) => group.length > 0);

  return (
    <section className="w-full bg-white px-4 pb-6 sm:px-6 sm:pb-8 lg:px-10 lg:pb-10 xl:px-12 xl:pb-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-14">
        <div className="w-full max-w-[560px]">
          <h2 className="fl3-3">
            {title}
          </h2>
          <p className="fl4-3 font-light mt-1 max-w-full md:mt-6">
            {descript}
          </p>
        </div>

        <div className="flex w-full justify-center max-md:self-center max-w-[300px] max-h-[300px] lg:max-w-[500px] lg:max-h-[300px] lg:justify-end">
          <Image
            src={image}
            alt={imageAlt}
            width={600}
            height={600}
            sizes="(max-width: 1024px) 300px, 500px"
            className="h-auto w-full max-w-[700px] object-contain"
          />
        </div>
      </div>

      {specificationGroups.length > 0 && (
        <div className="mt-8 flex max-md:flex-col gap-5 lg:mt-10 lg:items-start lg:gap-7">
          {specificationGroups.map((group, groupIndex) => (
            <div
              key={`spec-group-${groupIndex}`}
              className="self-start overflow-hidden rounded-lg bg-[#F6F6F6] grow max-md:w-full"
            >
              <table className="h-auto w-full table-auto border-separate border-spacing-0">
                <colgroup>
                  <col className="w-[36%]" />
                  <col />
                </colgroup>
                <tbody>
                  {group.map((item, itemIndex) => {
                    const isLastItem = itemIndex === group.length - 1;
                    const rowBorderClass = isLastItem
                      ? ""
                      : "border-b border-dashed border-[#D7D7D7]";

                    return (
                      <tr key={`${item.label}-${item.value}`}>
                        <th
                          scope="row"
                          className={`fl5 font-bold px-3 py-1.5 text-left align-middle md:px-5 md:py-2 ${rowBorderClass} border-r border-dashed border-[#D7D7D7]`}
                        >
                          {item.label}
                        </th>
                        <td
                          className={`fl5 font-medium px-3 py-1.5 align-middle md:px-5 md:py-3 ${rowBorderClass}`}
                        >
                          {item.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
