


export default function StartupSttisticCard ({data}) {
  const {icon: Icon, value, title} = data;
  return (
    <div className="bg-orange-300 flex flex-col items-center text-center gap-2 p-4 rounded-sm shadow-sm hover:shadow-orange-500 cursor-pointer">
      <Icon size={20}/>
      <h3 className="font-bold">{value}</h3>
      <p className="font-semibold">{title}</p>
    </div>
  );
}