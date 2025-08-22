import CurrentStock from "@/components/Stock Dashboard/CurrentStock";

const SpecificModelPage = async ({ params }: { params: { model: string } }) => {
  // async function getParams() {
  //   return model;
  // }
  // const model = await getParams();
  const { model } = await params;
  return (
    <div className='container mx-auto px-4 py-8'>
      <CurrentStock model={model} />
    </div>
  );
};

export default SpecificModelPage;
