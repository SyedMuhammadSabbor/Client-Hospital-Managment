export default function Button({text, type="button"}) {
  return <button type={type} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-designColor1  active:scale-95">{text}</button>;
}
