import { fireEvent, render, screen } from '@testing-library/react';
import HeaderButton from '../HeaderButton';

describe('HeaderButton', () => {
  it('HeaderButton Static UI 스냅샷', () => {
    const { container } = render(<HeaderButton />);
    expect(container).toMatchInlineSnapshot(`
  <div>
    <button
      class="p-3"
    />
  </div>
  `);
  });

  it('props label text', () => {
    render(<HeaderButton labelTitle="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('props icon', () => {
    const TestIcon = () => <svg className="test-icon" />;
    render(<HeaderButton icon={<TestIcon />} />);
    const iconElement = document.querySelector('svg.test-icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('클릭 했을 경우', () => {
    const handleClick = jest.fn();
    render(<HeaderButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('label title이 없고 icon만 있을 경우', () => {
    const TestIcon = () => <svg className="test-icon" />;
    render(<HeaderButton icon={<TestIcon />} />);
    const iconElement = document.querySelector('svg.test-icon');
    expect(iconElement).toBeInTheDocument();
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });

  it('icon이 없고 label title만 있을 경우', () => {
    render(<HeaderButton labelTitle="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(document.querySelector('svg.test-icon')).not.toBeInTheDocument();
  });

  it('label title과 icon이 없을 경우', () => {
    render(<HeaderButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.firstChild).toBeNull();
  });
});
