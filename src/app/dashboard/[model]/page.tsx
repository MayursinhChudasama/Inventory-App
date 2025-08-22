import CurrentStock from "@/components/Stock Dashboard/CurrentStock";

const SpecificModelPage = async ({ params }: { params: { model: string } }) => {
  async function getParams() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const { model } = params;
    return model;
  }
  const model = await getParams();
  return (
    <div className='container mx-auto px-4 py-8'>
      <CurrentStock model={model} />
    </div>
  );
};

export default SpecificModelPage;
